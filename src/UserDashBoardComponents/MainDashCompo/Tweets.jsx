import React from 'react';
import { motion } from 'framer-motion';
import { X, User, MessageCircle, Repeat, Heart, BarChart2 } from 'lucide-react';

// Inlined mock data to resolve the previous import error.
const mockPosts = [
    {
        name: "Ocean Guardian",
        handle: "OceanGuardian",
        timestamp: "2h",
        text: "Huge plastic waste accumulation spotted near the coast. Authorities need to act! #CleanSeas #OceanPollution",
        replies: 20,
        retweets: 75,
        likes: 150,
        views: "1.2K"
    },
    {
        name: "MarineLifeSaver",
        handle: "MarineLifeSaver",
        timestamp: "5h",
        text: "Sad to see coral bleaching getting worse. We must do more to combat climate change. #CoralReef #ClimateAction",
        replies: 35,
        retweets: 120,
        likes: 200,
        views: "3.5K"
    },
    {
        name: "Coastal Watch",
        handle: "CoastalWatch",
        timestamp: "1d",
        text: "Illegal fishing nets found abandoned. This harms marine life significantly. Reporting this now. #IllegalFishing #ProtectMarineLife",
        replies: 15,
        retweets: 40,
        likes: 90,
        views: "890"
    },
    {
        name: "Eco Volunteer",
        handle: "EcoVolunteer",
        timestamp: "1d",
        text: "Joined a beach cleanup today! Every little bit helps create a cleaner environment for everyone. #BeachCleanup #Volunteer #CleanSeas",
        replies: 50,
        retweets: 150,
        likes: 300,
        views: "5.1K"
    }
];

export default function XFeed({ theme }) {
    const isDark = theme === 'dark';
    
    // 1. Manage posts in state. Initialize with some mock data.
    const [posts, setPosts] = useState(initialPosts);

    // 2. Use useEffect to handle the streaming connection (a "side effect").
    useEffect(() => {
        const baseAPIUrl = "http://127.0.0.1:8001";
        const eventSource = new EventSource(`${baseAPIUrl}/tweeter_stream`);

        // This function is called whenever a new message is received from the server.
        eventSource.onmessage = (event) => {
            const newPost = JSON.parse(event.data);
            
            // 3. Update the state with the new post.
            // We use a functional update to prepend the new post to the existing list.
            setPosts(currentPosts => [newPost, ...currentPosts]);
        };

        // Handle any errors with the connection
        eventSource.onerror = (error) => {
            console.error("EventSource failed:", error);
            eventSource.close();
        };

        // 4. Clean up: This function is called when the component unmounts.
        // It's crucial for preventing memory leaks.
        return () => {
            eventSource.close();
        };
    }, []); // The empty dependency array `[]` ensures this effect runs only once.


    // --- Theming classes (unchanged) ---
    const containerClasses = isDark ? "bg-gray-800 border border-gray-700" : "bg-white shadow-lg";
    const headerClasses = isDark ? "text-gray-100" : "text-gray-800";
    const xIconColor = isDark ? "white" : "black";
    const scrollbarClasses = isDark 
        ? "[&::-webkit-scrollbar-track]:bg-slate-700 [&::-webkit-scrollbar-thumb]:bg-slate-500" 
        : "[&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300";
    const postBorderClass = isDark ? "border-gray-700" : "border-gray-100";
    const avatarBgClass = isDark ? "bg-gray-700" : "bg-gray-200";
    const avatarIconClass = isDark ? "text-gray-400" : "text-gray-600";
    const nameClass = isDark ? "text-gray-100" : "text-gray-900";
    const handleClass = isDark ? "text-gray-400" : "text-gray-500";
    const textClass = isDark ? "text-gray-200" : "text-gray-800";
    const actionsClass = isDark ? "text-gray-400" : "text-gray-500";

    return (
        <motion.div 
            className={`p-4 sm:p-6 rounded-2xl flex flex-col h-[40rem] md:h-[40rem] lg:h-[44rem] font-sans transition-colors duration-300 ${containerClasses}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
        >
            <h3 className={`text-xl font-bold mb-4 flex items-center flex-shrink-0 ${headerClasses}`}>
                <X className="mr-3" color={xIconColor} size={22} />
                Live Social Feed
            </h3>
            <div className={`space-y-1 overflow-y-auto flex-grow -mr-4 pr-4 [&::-webkit-scrollbar]:w-2 ${scrollbarClasses}`}>
                {/* 5. Render the posts from state, not the mock data constant. */}
                {posts.map((post, index) => (
                    <motion.div 
                        key={`${post.handle}-${index}`} // Use a more stable key if possible
                        className={`flex items-start space-x-3 p-3 border-b last:border-b-0 rounded-lg ${postBorderClass}`}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className={`rounded-full p-2 flex-shrink-0 mt-1 ${avatarBgClass}`}>
                            <User size={20} className={avatarIconClass} />
                        </div>
                        <div className="w-full">
                            <div className="flex items-center space-x-1">
                                <p className={`font-bold text-sm hover:underline cursor-pointer ${nameClass}`}>{post.name}</p>
                                <p className={`text-sm ${handleClass}`}>@{post.handle}</p>
                                <span className={handleClass}>·</span>
                                <p className={`text-sm hover:underline cursor-pointer ${handleClass}`}>{post.timestamp}</p>
                            </div>
                            <p className={`text-sm leading-snug my-1 ${textClass}`}>{post.text}</p>
                            <div className={`flex justify-between items-center mt-3 max-w-sm ${actionsClass}`}>
                                {/* Action Icons */}
                                <div className="flex items-center space-x-1 group cursor-pointer">
                                    <MessageCircle size={18} className="group-hover:text-blue-500"/>
                                    <span className="text-xs group-hover:text-blue-500">{post.replies}</span>
                                </div>
                                <div className="flex items-center space-x-1 group cursor-pointer">
                                    <Repeat size={18} className="group-hover:text-green-500"/>
                                    <span className="text-xs group-hover:text-green-500">{post.retweets}</span>
                                </div>
                                <div className="flex items-center space-x-1 group cursor-pointer">
                                    <Heart size={18} className="group-hover:text-pink-500"/>
                                    <span className="text-xs group-hover:text-pink-500">{post.likes}</span>
                                </div>
                                <div className="flex items-center space-x-1 group cursor-pointer">
                                    <BarChart2 size={18} className="group-hover:text-blue-500"/>
                                    <span className="text-xs group-hover:text-blue-500">{post.views}</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}