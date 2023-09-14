import FlexSearch from 'flexsearch';
import GhostContentAPI from '@tryghost/content-api';

export default class SearchIndex {
    constructor({adminUrl, apiKey}) {
        this.api = new GhostContentAPI({
            url: adminUrl,
            key: apiKey,
            version: 'v5.0'
        });

        this.postsIndex = new FlexSearch.Document({
            tokenize: 'forward',
            document: {
                id: 'id',
                index: ['title', 'excerpt'],
                store: true
            }
        });
        // 支持中文关键词搜索
        // https://github.com/nextapps-de/flexsearch#cjk-word-break-chinese-japanese-korean
        this.postsIndexCN = new FlexSearch.Document({
            encode: str => str.replace(/[\x00-\x7F]/g, '').split(''),
            document: {
                id: 'id',
                index: ['title', 'excerpt'],
                store: true
            }
        });

        this.authorsIndex = new FlexSearch.Document({
            tokenize: 'forward',
            document: {
                id: 'id',
                index: ['name'],
                store: true
            }
        });
        // 支持中文关键词搜索
        // https://github.com/nextapps-de/flexsearch#cjk-word-break-chinese-japanese-korean
        this.authorsIndexCN = new FlexSearch.Document({
            encode: str => str.replace(/[\x00-\x7F]/g, '').split(''),
            document: {
                id: 'id',
                index: ['name'],
                store: true
            }
        });

        this.tagsIndex = new FlexSearch.Document({
            tokenize: 'forward',
            document: {
                id: 'id',
                index: ['name'],
                store: true
            }
        });
        // 支持中文关键词搜索
        // https://github.com/nextapps-de/flexsearch#cjk-word-break-chinese-japanese-korean
        this.tagsIndexCN = new FlexSearch.Document({
            encode: str => str.replace(/[\x00-\x7F]/g, '').split(''),
            document: {
                id: 'id',
                index: ['name'],
                store: true
            }
        });

        this.init = this.init.bind(this);
        this.search = this.search.bind(this);
    }

    #updatePostIndex(posts) {
        posts.forEach((post) => {
            this.postsIndex.add(post);
            this.postsIndexCN.add(post);
        });
    }

    #updateAuthorsIndex(authors) {
        authors.forEach((author) => {
            this.authorsIndex.add(author);
            this.authorsIndexCN.add(author);
        });
    }

    #updateTagsIndex(tags) {
        tags.forEach((tag) => {
            this.tagsIndex.add(tag);
            this.tagsIndexCN.add(tag);
        });
    }

    async init() {
        let posts = await this.api.posts.browse({
            limit: '10000',
            fields: 'id,slug,title,excerpt,url,updated_at,visibility',
            order: 'updated_at DESC'
        });

        if (posts || posts.length > 0) {
            if (!posts.length) {
                posts = [posts];
            }
            this.#updatePostIndex(posts);
        }

        let authors = await this.api.authors.browse({
            limit: '10000',
            fields: 'id,slug,name,url,profile_image',
            order: 'updated_at DESC'
        });

        if (authors || authors.length > 0) {
            if (!authors.length) {
                authors = [authors];
            }

            this.#updateAuthorsIndex(authors);
        }

        let tags = await this.api.tags.browse({
            limit: '10000',
            fields: 'id,slug,name,url',
            order: 'updated_at DESC',
            filter: 'visibility:public'
        });

        if (tags || tags.length > 0) {
            if (!tags.length) {
                tags = [tags];
            }

            this.#updateTagsIndex(tags);
        }
    }

    #normalizeSearchResult(result) {
        const normalized = [];
        const usedIds = {};

        result.forEach((resultItem) => {
            resultItem.result.forEach((doc) => {
                if (!usedIds[doc.id]) {
                    normalized.push(doc.doc);
                    usedIds[doc.id] = true;
                }
            });
        });

        return normalized;
    }

    mergeAndFilterObjects(arr1, arr2) {
        // 合并两个数组
        const mergedArray = [...arr1, ...arr2];
        // 使用一个 Map 来存储唯一的对象
        const uniqueObjectsMap = new Map();
        // 遍历合并后的数组，以对象的某个属性（或整个对象）作为唯一标识符
        for (const obj of mergedArray) {
            // 这里假设对象有一个唯一的属性叫做 'id'，你可以根据需要修改
            const uniqueIdentifier = obj.id;
            // 将对象添加到 Map 中，使用唯一标识符作为键
            uniqueObjectsMap.set(uniqueIdentifier, obj);
        }
        // 将 Map 中的对象转换回数组
        return [...uniqueObjectsMap.values()];
    }

    search(value) {
        const posts = this.postsIndex.search(value, {
            enrich: true
        });
        const postsCN = this.postsIndexCN.search(value, {
            enrich: true
        });

        const authors = this.authorsIndex.search(value, {
            enrich: true
        });
        const authorsCN = this.authorsIndexCN.search(value, {
            enrich: true
        });
        const tags = this.tagsIndex.search(value, {
            enrich: true
        });
        const tagsCN = this.tagsIndexCN.search(value, {
            enrich: true
        });

        return {
            posts: this.mergeAndFilterObjects(this.#normalizeSearchResult(posts), this.#normalizeSearchResult(postsCN)),
            authors: this.mergeAndFilterObjects(this.#normalizeSearchResult(authors), this.#normalizeSearchResult(authorsCN)),
            tags: this.mergeAndFilterObjects(this.#normalizeSearchResult(tags), this.#normalizeSearchResult(tagsCN))
        };
    }
}
