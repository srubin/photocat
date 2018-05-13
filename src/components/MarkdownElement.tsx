import * as React from 'react';
import {MarkdownItem} from '../reducers';

interface IProps {
    markdownItem: MarkdownItem;
}

export default class MarkdownElement extends React.Component<IProps> {
    render() {
        return (
            <div className='MarkdownElement'>
                {this.props.markdownItem.markdown}
            </div>
        );
    }
}
