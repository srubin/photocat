import * as React from 'react';
import * as Gallery from 'react-grid-gallery';
import {GalleryImage} from 'react-grid-gallery';
import {LocalImage, VisibilityFilter} from '../reducers';

export interface IProps {
    localImages: LocalImage[];
    selectedImages: Set<string>;
    toggleSelectPhoto: (imagePath: string) => void;
    visibilityFilter: VisibilityFilter;
}

export default class PhotoBrowser extends React.Component<IProps> {
    onSelectImage = (index: number, image: GalleryImage) => {
        this.props.toggleSelectPhoto(image.src);
    }

    render() {
        const {localImages, selectedImages, visibilityFilter} = this.props;
        const images: GalleryImage[] = localImages.filter((localImage): boolean => {
            if (visibilityFilter === VisibilityFilter.Selected) {
                const {path} = localImage;
                return selectedImages.has(path);
            }
            return true;
        }).map((localImage): GalleryImage => {
            const {path, width, height, thumbnailPath} = localImage;
            const ratio = width / height;
            const newHeight = 200;
            const newWidth = ratio * newHeight;
            const isSelected = selectedImages.has(path);
            return {
                src: path,
                thumbnail: thumbnailPath,
                thumbnailWidth: newWidth,
                thumbnailHeight: newHeight,
                isSelected,
            };
        });
        return (
            <Gallery images={images} onSelectImage={this.onSelectImage} />
        );
    }
}