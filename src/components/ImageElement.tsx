import {LocalImage} from '../reducers';
import * as React from 'react';

interface IProps {
    localImage: LocalImage;
}

export default class MarkdownElement extends React.Component<IProps> {
    render() {
        return (
            <div className='ImageElement'>
                <div>
                    <img src={'file://' + this.props.localImage.thumbnailPath} />
                </div>
                <div>
                    {this.props.localImage.caption}
                </div>
            </div>
        );
    }
}
