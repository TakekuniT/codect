import React from 'react';

interface TagComponentProps {
    label: string;
    list: string[]; 
}

const TagComponent: React.FC<TagComponentProps> = ({ label, list }) => {
    return (
        <div className="mt-2">
            <h4 className="font-bold mb-2">{label}:</h4>
            <div className="flex flex-wrap gap-2">
                {list.map((item, index) => (
                    <span 
                        key={index} 
                        className="bg-gray-200 text-gray-800 text-sm font-medium px-3 py-1 rounded-lg"
                    >
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default TagComponent;
