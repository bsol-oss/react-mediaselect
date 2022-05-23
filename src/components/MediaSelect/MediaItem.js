import React from 'react'
import {
    SiMicrosoftexcel,
    SiMicrosoftword,
    SiMicrosoftpowerpoint,
} from 'react-icons/si'
import {
    AiOutlineFileZip,
    AiOutlineFilePdf,
    AiOutlineFile,
} from 'react-icons/ai'

import {
    ImageItemContainer,
    VideoThumbnailContainer,
    VideoThumbnail,
    ApplicationIcons,
    Overlay,
} from './styles'

const MediaItem = ({ item, popup, onSelect, actions = {} }) => {
    let { type = 'picture', selected } = item.original
    type = type.toLowerCase()

    const onClick = () => {
        if (onSelect || actions.onSelect) {
            const select = onSelect || actions.onSelect
            select(item.original, item.index)
        } else {
            popup()
        }
    }

    if (type.substring(0, 3) === 'doc') {
        let appIcon = <AiOutlineFile id="fileIcon" color="#000" />

        if (type.includes('word')) {
            appIcon = <SiMicrosoftword id="wordIcon" color="#0000FF" />
        } else if (type.includes('ms-powerpoint')) {
            appIcon = <SiMicrosoftpowerpoint id="pptIcon" color="#FFA500" />
        } else if (type.includes('ms-excel')) {
            appIcon = <SiMicrosoftexcel id="excIcon" color="#008000" />
        } else if (type.includes('pdf')) {
            appIcon = <AiOutlineFilePdf id="pdfIcon" color="#FF0000" />
        } else if (type.includes('zip')) {
            appIcon = <AiOutlineFileZip id="zipIcon" color="#808080" />
        }

        return (
            <ApplicationIcons onClick={onClick}>
                {appIcon}
                <Overlay selected={selected} />
            </ApplicationIcons>
        )
    }

    return (
        <>
            {type === 'video' ? (
                <VideoThumbnailContainer
                    onClick={onClick}
                    className={`${selected ? 'selected' : ''}`}
                >
                    <VideoThumbnail src={item.original.thumbnail} />
                    <Overlay />
                </VideoThumbnailContainer>
            ) : (
                <ImageItemContainer
                    onClick={onClick}
                    className={`${selected ? 'selected' : ''}`}
                >
                    <img
                        src={item.original.thumbnail}
                        alt={item.original.title}
                    />
                    <Overlay />
                </ImageItemContainer>
            )}
        </>
    )
}

export default MediaItem
