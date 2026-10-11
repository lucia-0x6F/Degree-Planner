export function ProgressPanel() {

    return (

        <aside className="border-l p-5">

            <h2 className="font-bold text-xl mb-5">
                Graduation Progress
            </h2>


            <div className="mb-3">
                Credits
            </div>

            <div className="text-3xl font-bold">
                72 / 120
            </div>


            <div className="mt-5 bg-gray-200 rounded h-4">

                <div
                    className="bg-black rounded h-4"
                    style={{
                        width: "60%"
                    }} />

            </div>


            <p className="mt-3 text-gray-500">
                60% completed
            </p>


        </aside>
        

    );

}
