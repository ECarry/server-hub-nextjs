interface CardsListPops {
  category: string;
  manufacturer: string;
}

const GridCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="
        grid
      "
    >
      {children}
    </div>
  );
};

const Card = () => {};

const CardsList = ({ category, manufacturer }: CardsListPops) => {
  return (
    <div>
      <h1>{category}</h1>
      <h2>{manufacturer}</h2>
    </div>
  );
};

export default CardsList;
