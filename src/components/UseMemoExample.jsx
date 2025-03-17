import { useState, useMemo, useEffect } from "react";

//Basic Memoization
function FactorialComponent({ num }) {
    const factorial = useMemo(() => {
        console.log("Calculating factorial..."); // Debugging to check when it's recalculated
        if (num <= 1) return 1;
        let result = 1;
        for (let i = num; i > 1; i--) {
            result *= i;
        }
        return result;
    }, [num]); // Only recompute when num changes

    return (
        <div>
            <h2>Factorial of {num}: {factorial}</h2>
        </div>
    );
}

//Filtering a Large List
function List(){
    const LIST = [
        { id: 1, title: "iPhone 12", type: "phone", genre: "smartphone" },
        { id: 2, title: "iPad Pro", type: "tablet", genre: "pro" },
        { id: 3, title: "MacBook Pro", type: "laptop", genre: "pro" },
        { id: 4, title: "iPad Air", type: "tablet", genre: "mid-range" },
        { id: 5, title: "iPhone 11", type: "phone", genre: "smartphone" },
        { id: 6, title: "Samsung Galaxy S22", type: "phone", genre: "android" },
        { id: 7, title: "Asus ZenBook 14", type: "laptop", genre: "ultrabook" },
        { id: 8, title: "Google Pixel 6", type: "phone", genre: "android" },
        { id: 9, title: "Microsoft Surface Pro 8", type: "tablet", genre: "pro" },
        { id: 10, title: "Apple iMac 24", type: "desktop", genre: "all-in-one" },
        { id: 11, title: "HP Pavilion Gaming 15", type: "laptop", genre: "gaming" },
        { id: 12, title: "Lenovo IdeaPad 330S", type: "laptop", genre: "mid-range" },
        { id: 13, title: "Dell XPS 13", type: "laptop", genre: "ultrabook" },
        { id: 14, title: "Acer Aspire 5", type: "laptop", genre: "budget" },
        { id: 15, title: "Microsoft Surface Laptop 4", type: "laptop", genre: "ultrabook" },
        { id: 16, title: "Google Pixelbook Go", type: "laptop", genre: "chromebook" },
        { id: 17, title: "Apple iMac Pro 27", type: "desktop", genre: "pro" },
        { id: 18, title: "HP Envy 15", type: "laptop", genre: "mid-range" },
        { id: 19, title: "Asus ZenBook Flip 15", type: "laptop", genre: "convertible" },
        { id: 20, title: "Lenovo ThinkPad X1 Carbon", type: "laptop", genre: "ultrabook" }
    ];

    const [filterType, setFilterType] = useState("all");
    const [sortBy, setSortBy] = useState("title");

    // Memoized filtered & sorted list
    const filteredAndSortedItems = useMemo(() => {
        console.log("Filtering & Sorting items...");

        let filtered = filterType === "all" ? LIST : LIST.filter(item => item.type === filterType);

        return [...filtered].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }, [filterType, sortBy]);

    // const filteredItems = LIST.filter(item=>item.type===filterType); // when not using useMemo

    return (
        <div>
            <h3>Filter by Type:</h3>
            <select onChange={(e) => setFilterType(e.target.value)} value={filterType}>
                <option value="all">All</option>
                <option value="phone">Phone</option>
                <option value="tablet">Tablet</option>
                <option value="laptop">Laptop</option>
            </select>

            <h3>Sort by:</h3>
            <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
                <option value="title">Title</option>
                <option value="type">Type</option>
                <option value="genre">Genre</option>
            </select>

            <ul>
                {filteredAndSortedItems.map(item => (
                    <li key={item.id}>{item.title} ({item.type})</li>
                ))}
            </ul>
        </div>
    );
}

//Avoiding Re-Renders in Child Components
function Child({num}){
    useEffect(()=>{
        console.log("Child rendered");
        
    }, [num])
    return (
        <h4>{num}</h4>
    )
}

function UseMemoExample() {
    const [num, setNum] = useState(5);

    const reminder = useMemo(()=>num % 2,[num]);

    return (
        <>
            <FactorialComponent num={num} />
            <button onClick={() => setNum(num + 1)}>Increment</button>
            <h3>List</h3>
            <List />
            <Child num={reminder} />
        </> // Increment num to trigger a re-render
    )
}
export default UseMemoExample