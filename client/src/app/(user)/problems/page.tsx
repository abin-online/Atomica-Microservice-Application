'use client'
import ProblemList from '@/components/user/ProblemList';
import { getAllTags } from '@/api/tag';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const Page = () => {

    const [tags, setTags] = useState([])
    const [selectedTags, setSelectedTags] = useState<string[]>([]);

    useEffect(() => {
        const fetchTag = async () => {
            try {
                const response: any = await getAllTags();
                if (response?.data) {
                    setTags(response.data);
                }
                console.log(response.data)
            } catch (error) {
                console.error('Error fetching tags:', error);
                toast.error('Failed to load tags');
            }
        }
        fetchTag()
    }, [])

    const handleTagClick = (tagName: string) => {
        setSelectedTags((prevSelectedTags) => {
            const isSelected = prevSelectedTags.includes(tagName);
            if (isSelected) {
                return prevSelectedTags.filter((tag) => tag !== tagName);
            } else {
                return [...prevSelectedTags, tagName];
            }
        });
    
        setTimeout(() => {
            const isSelected = selectedTags.includes(tagName);
            if (isSelected) {
                toast.success(`Deselected tag: ${tagName}`);
            } else {
                toast.success(`Selected tag: ${tagName}`);
            }
        }, 0);
    };
    
    

    return (
        <div className="quick-test-home bg-gray-100 text-gray-800 min-h-screen">


            <div className="flex flex-col items-center justify-center py-6 ">
                {/* Search Bar */}
                <div className="mb-6 w-full  max-w-4xl">
                    <input
                        type="text"
                        placeholder="Search problems..."
                        className="w-full px-4 py-2 border rounded-full shadow focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                {/* Tags Section */}

                <div className="flex flex-wrap gap-2 justify-center items-center max-w-4xl">
                    {tags.map((tag: any, index: number) => (
                        <span
                            key={index}
                            onClick={() => handleTagClick(tag.name)}
                            className={`relative bg-blue-500 text-white px-4 py-2 rounded-full text-sm shadow cursor-pointer ${selectedTags.includes(tag.name) ? 'bg-blue-600' : 'hover:bg-blue-600'
                                }`}
                        >
                            {tag.name}

                            {/* Tick or Cross Indicator */}
                            {selectedTags.includes(tag.name) && (
                                <span className="absolute top-1 right-1 text-white">
                                    ✓
                                </span>
                            )}
                        </span>
                    ))}
                </div>
            </div>


            <ProblemList selectedTags={selectedTags} />

        </div>
    );
};

export default Page;
