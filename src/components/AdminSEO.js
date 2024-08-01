import React, { useState, useEffect } from 'react';

const AdminSEO = () => {
    const [metaDescription, setMetaDescription] = useState('');
    const [metaKeywords, setMetaKeywords] = useState('');
    const [metaTitle, setMetaTitle] = useState('');

    useEffect(() => {
        // Fetch current SEO settings from server
        fetch('http://localhost:555/api/seo')
            .then(response => response.json())
            .then(data => {
                setMetaDescription(data.description);
                setMetaKeywords(data.keywords);
                setMetaTitle(data.title);
            });
    }, []);

    const handleSave = () => {
        // Save SEO settings to server
        fetch('/api/seo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                description: metaDescription,
                keywords: metaKeywords,
                title: metaTitle,
            }),
        }).then(response => {
            if (response.ok) {
                alert('SEO settings saved successfully');
            } else {
                alert('Failed to save SEO settings');
            }
        });
    };

    return (
        <div>
            <h2>Pengaturan SEO</h2>
            <div>
                <label>Meta Title:</label>
                <input
                    type="text"
                    value={metaTitle}
                    onChange={(e) => setMetaTitle(e.target.value)}
                />
            </div>
            <div>
                <label>Meta Description:</label>
                <textarea
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                />
            </div>
            <div>
                <label>Meta Keywords:</label>
                <input
                    type="text"
                    value={metaKeywords}
                    onChange={(e) => setMetaKeywords(e.target.value)}
                />
            </div>
            <button onClick={handleSave}>Save</button>
        </div>
    );
};

export default AdminSEO;
