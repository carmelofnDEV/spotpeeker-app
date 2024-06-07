import { useState, useEffect } from 'react';

export const TagInput = ({ setPostTags, defaultTags }) => {
    const [tags, setTags] = useState(defaultTags);
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        console.log("TAGS inoput",defaultTags)
    }, [tags, setPostTags]);

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    const handleAddTag = (e) => {
        e.preventDefault();

        if (inputValue.trim() !== '' && tags.length < 4) {
            let newTag ={"nombre":inputValue.trim()}
            setTags([...tags, newTag]);
            setInputValue('');
            setPostTags([...tags, newTag]);
            
        }
    };

    const handleTagRemove = (index) => {
        setTags(tags.filter((_, i) => i !== index));
        setPostTags(tags.filter((_, i) => i !== index));

    };

    return (
        <div className='w-full'>
            <div className='w-full'>
                <div className='w-full flex gap-3'>
                    <input
                        className='w-full bg-[#fafafa] py-1 px-2 rounded-md'
                        type="text"
                        value={inputValue}
                        onChange={handleInputChange}
                        placeholder="Agregar colaborador (max. 4)"
                        disabled={tags.length >= 4}
                    />
                    <button
                        type="button"
                        className='bg-[#fafafa] py-1 px-2 rounded-md'
                        onClick={handleAddTag}
                        disabled={tags.length >= 4}
                    >
                        Añadir
                    </button>
                </div>
            </div>
            <div className='flex flex-wrap gap-3 p-3 h-14 overflow-y-auto rounded-md bg-white border-1 mt-2 w-full'>
                {tags.map((tag, index) => (
                    <div key={index} className="tag flex gap-2 bg-[#fafafa] py-1 px-2 rounded-md">
                        #{tag.nombre}
                        <button  type="button" onClick={() => handleTagRemove(index)}>
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M12.0004 9.5L17.0004 14.5M17.0004 9.5L12.0004 14.5M4.50823 13.9546L7.43966 17.7546C7.79218 18.2115 7.96843 18.44 8.18975 18.6047C8.38579 18.7505 8.6069 18.8592 8.84212 18.9253C9.10766 19 9.39623 19 9.97336 19H17.8004C18.9205 19 19.4806 19 19.9084 18.782C20.2847 18.5903 20.5907 18.2843 20.7824 17.908C21.0004 17.4802 21.0004 16.9201 21.0004 15.8V8.2C21.0004 7.0799 21.0004 6.51984 20.7824 6.09202C20.5907 5.71569 20.2847 5.40973 19.9084 5.21799C19.4806 5 18.9205 5 17.8004 5H9.97336C9.39623 5 9.10766 5 8.84212 5.07467C8.6069 5.14081 8.38579 5.2495 8.18975 5.39534C7.96843 5.55998 7.79218 5.78846 7.43966 6.24543L4.50823 10.0454C3.96863 10.7449 3.69883 11.0947 3.59505 11.4804C3.50347 11.8207 3.50347 12.1793 3.59505 12.5196C3.69883 12.9053 3.96863 13.2551 4.50823 13.9546Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                </g>
                            </svg>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};
