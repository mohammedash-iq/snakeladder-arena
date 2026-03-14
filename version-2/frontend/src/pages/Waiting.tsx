
function Waiting() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-100">

            <div className="bg-white p-8 rounded-2xl flex flex-col items-center gap-4">

                <h1 className="text-2xl font-bold text-gray-800">
                    Waiting for another player
                </h1>
                <p className="text-gray-500 text-sm">
                    The game will start once someone joins
                </p>
                <div className="flex gap-2 mt-2">
                    <div className="w-3 h-3 bg-green-500  animate-bounce"></div>
                    <div className="w-3 h-3 bg-red-500 animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-3 h-3 bg-blue-500 animate-bounce [animation-delay:0.4s]"></div>
                </div>
            </div>

        </div>
    );
}
export default Waiting