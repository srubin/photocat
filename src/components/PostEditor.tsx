import * as React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
import {isMarkdownItem, PostItem} from '../reducers';
import MarkdownElement from './MarkdownElement';
import ImageElement from './ImageElement';

const SortableItem = SortableElement((obj: {value: PostItem}) => {
    if (isMarkdownItem(obj.value)) {
        return (
            <MarkdownElement markdownItem={obj.value}/>
        );
    }
    return (
        <ImageElement localImage={obj.value} />
    );
});

const SortableList = SortableContainer((obj: {items: PostItem[]}) => {
    return (
        <div>
            {obj.items.map((value: PostItem, index) => {
                return (<SortableItem key={value.id} index={index} value={value} />);
            })}
        </div>
    );
});

interface IProps {
    items: PostItem[];
    reorderPostItems: (fromIndex: number, toIndex: number) => void;
}

export default class PostEditor extends React.Component<IProps> {
    onSortEnd = (change: {oldIndex: number, newIndex: number}) => {
        const {oldIndex, newIndex} = change;
        this.props.reorderPostItems(oldIndex, newIndex);
    }

    shouldComponentUpdate(newProps: IProps): boolean {
        const shouldUpdate = this.props !== newProps;
        console.log('should update', shouldUpdate);
        return shouldUpdate;
    }

    render() {
        return (
            <div>
                <SortableList items={this.props.items} onSortEnd={this.onSortEnd} />
            </div>
        );
    }
}