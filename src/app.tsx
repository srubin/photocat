import * as React from 'react';
import PhotoBrowserContainer from './containers/PhotoBrowserContainer';
import PhotoBrowserControlsContainer from './containers/PhotoBrowserControlsContainer';
import PostEditorContainer from './containers/PostEditorContainer';

export class App extends React.Component<undefined, undefined> {
    render() {
        return (
            <div className='Main'>
                <div className='Pane'>
                    <PhotoBrowserControlsContainer />
                    <PhotoBrowserContainer />
                </div>
                <div className='Pane'>
                    <PostEditorContainer />
                </div>
            </div>
        );
    }
}
