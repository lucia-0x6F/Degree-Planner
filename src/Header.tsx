import { Button } from "./Button";


export function Header() {
    // return <h1>Header 1</h1>
    return (
    <header className = "flex items-center justify-between">
        <div className = "flex flex-col gap-1">
            <h1 className = "text-3xl font-bold">Degree Planner</h1>
            <span className = "text-zinc-400 text-sm">A tool for modeling degree requirements and checking student progress toward graduation.</span>
        </div>
        <div className = "flex flex-col gap-1">
            <span className = "text-zinc-400 text-sm">
                University of British Columbia
            </span>
            <div className = "flex items-center gap-3">
                <Button> Prev </Button> 
                <Button> Next </Button> 
            </div>
        </div>
    </header>
    )
}