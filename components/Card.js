export default function Card(props) {
    return(
        <div className="w-full h-auto flex">
            <div className="w-72 h-32 p-3 mr-5 bg-gray-300 flex items-center" style={{marginTop: `${props.margin}px`}}>
                <div className="ml-5">
                    <span>Komputer & Laptop</span><br/>
                    <span className="text-xs">50 Products</span>
                </div>
            </div>
            <div className="w-72 h-32 p-3 mr-5 bg-gray-300 flex items-center" style={{marginTop: `${props.margin}px`}}>
                <div className="ml-5">
                    <span>Fashion</span><br/>
                    <span className="text-xs">50 Products</span>
                </div>
            </div>
            <div className="w-72 h-32 p-3 mr-5 bg-gray-300 flex items-center" style={{marginTop: `${props.margin}px`}}>
                <div className="ml-5">
                    <span>Food and Baverage</span><br/>
                    <span className="text-xs">50 Products</span>
                </div>
            </div>
            <div className="w-72 h-32 p-3 bg-gray-300 flex items-center" style={{marginTop: `${props.margin}px`}}>
                <div className="ml-5">
                    <span>Elektronik</span><br/>
                    <span className="text-xs">50 Products</span>
                </div>
            </div>
        </div>
    )
}