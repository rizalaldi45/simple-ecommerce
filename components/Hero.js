export default function Hero(){
    return(
        <div className="flex mt-10">
            <div className="w-2/4 h-auto flex items-center">
                <div className="mb-14">
                    <h1 className="text-3xl leading-relaxed">Your favorite<br/> products made affordable<br/> for you</h1>
                    <p className="text-gray-400 text-sm leading-relaxed mt-2">Be the first to hear of our <br/> exciting sales and promos and<br/> get updates</p>
                    <button className="mt-5 w-auto py-3 px-2 bg-gray-300 py-2 px-7 hover:drop-shadow-md">
                        Discover More
                    </button>
                </div>
            </div>
        </div>
    )
}