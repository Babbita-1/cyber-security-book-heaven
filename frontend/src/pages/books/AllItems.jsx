import ItemCard from "../../components/ItemCard";

const sampleItems = [
  { id: 1, title: "Book One", author: "Author A", image: "/book1.jpg" },
  { id: 2, title: "Book Two", author: "Author B", image: "/book2.jpg" },
  // add more items
];

const AllItems = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
      {sampleItems.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default AllItems;
