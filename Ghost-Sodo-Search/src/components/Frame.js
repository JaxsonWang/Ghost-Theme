import React, {Component} from 'react';
import {createPortal} from 'react-dom';

export default class Frame extends Component {
    componentDidMount() {
        this.node.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
        this.setupFrameBaseStyle();

        this.calculateBodyFontSize();
    };

    componentWillUnmout() {
        this.node.removeEventListener('load', this.handleLoad);
    }

    setupFrameBaseStyle() {
        if (this.node.contentDocument) {
            this.iframeHtml = this.node.contentDocument.documentElement;
            // set the iframeHtml dir attribute
            this.iframeHtml.setAttribute('dir', this.props.searchdir);
            this.iframeHead = this.node.contentDocument.head;
            this.iframeRoot = this.node.contentDocument.body;

            // 判断当前样式
            const hasDark = document.documentElement.classList.contains('dark');
            hasDark ? this.iframeHtml.classList.add('dark') : this.iframeHtml.classList.remove('dark');

            this.forceUpdate();
        }
    }

    calculateBodyFontSize() {
        if (!this.node?.contentDocument) return;

        const doc = this.node.contentDocument;

        const visualViewport = window.visualViewport;
        const width = visualViewport?.width || doc.documentElement.clientWidth;

        const dpr = window.devicePixelRatio || 1;
        const baseCount = 12 * dpr;
        let fontSize = (width / baseCount) + 'px';

        if (width >= 768) fontSize = '62.5%'

        const style = doc.createElement('style');
        style.id = 'dynamic-font-style';
        style.textContent = `html { font-size: ${fontSize}; }`;
        doc.head.appendChild(style);
    }

    render() {
        const {children, head, title = '', style = {}, ...rest} = this.props;

        return (
            <iframe srcDoc={`<!DOCTYPE html>`} {...rest} ref={node => (this.node = node)} title={title} style={style} frameBorder="0">
                {this.iframeHead && createPortal(head, this.iframeHead)}
                {this.iframeRoot && createPortal(children, this.iframeRoot)}
            </iframe>
        );
    }
}
