import React from 'react'

import { ThumbnailsContainer } from './styles'

const Thumbnails = ({ items }) => {
    if (!items) items = []
    else if (!Array.isArray(items)) {
        items = [items]
    }

    return (
        <ThumbnailsContainer>
            {items.map((item, index) => (
                <div key={index}>
                    {item.type === 'video' ? (
                        <video src={item.thumbnail} />
                    ) : (
                        <img src={item.thumbnail} />
                    )}
                </div>
            ))}
        </ThumbnailsContainer>
    )
}

export default Thumbnails
