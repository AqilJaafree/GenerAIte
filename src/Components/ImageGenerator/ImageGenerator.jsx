import React, { useRef, useState } from 'react';
import './ImageGenerator.css';

const ImageGenerator = () => {
    const [image_url, setImage_url] = useState('/');
    let inputRef = useRef(null);
    const [loading, setLoading] = useState(false);

    const imageGenerator = async () => {
        if (inputRef.current.value === '') {
            return 0;
        }

        setLoading(true);

        const response = await fetch(
            'https://api.openai.com/v1/images/generations',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization:
                        'Bearer ',
                    'User-Agent': 'Brave',
                },
                body: JSON.stringify({
                    prompt: `${inputRef.current.value}`,
                    n: 1,
                    size: '512x512',
                }),
            }
        );

        let data = await response.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false);

        // Initiate the image download
        downloadImage(data_array[0].url, 'generated_image.png');
    };

    const downloadImage = (url, fileName) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="ai-image-generator">
            <div className="header">
                NFT Images <span>generator</span>
            </div>
            <div className="img-loading">
                <div className="image">
                    <img src={image_url === '/' ? default_image : image_url} alt="" />
                </div>
                <div className="loading">
                    <div className={loading ? 'loading-bar-full' : 'loading-bar'}></div>
                    <div className={loading ? 'loading-text' : 'display-none'}>Loading....</div>
                </div>
            </div>
            <div className="search-box">
                <input
                    type="text"
                    ref={inputRef}
                    className="search-input"
                    placeholder="Describe"
                />
                <div className="generate-button" onClick={() => imageGenerator()}>
                    Generate
                </div>
            </div>
        </div>
    );
};

export default ImageGenerator;
