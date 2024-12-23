import React, {Component} from 'react';
import {createPortal} from 'react-dom';

export default class Frame extends Component {
    componentDidMount() {
        this.node.addEventListener('load', this.handleLoad);
    }

    handleLoad = () => {
        this.setupFrameBaseStyle();
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
            this.forceUpdate();
        }
    }

    render() {
        const {children, head, title = '', style = {}, ...rest} = this.props;

        // 判断当前样式
        if (this.iframeHtml) {
            const hasDark = document.documentElement.classList.contains('dark');
            hasDark ? this.iframeHtml.classList.add('dark') : this.iframeHtml.classList.remove('dark');
        }

        return (
            <iframe srcDoc={`<!DOCTYPE html>`} {...rest} ref={node => (this.node = node)} title={title} style={style} frameBorder="0">
                {this.iframeHead && createPortal(head, this.iframeHead)}
                {this.iframeRoot && createPortal(children, this.iframeRoot)}
            </iframe>
        );
    }
}
