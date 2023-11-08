import Hero from "../components/Hero";
import Content from "../components/Content";

const Home = ({ data }) => {
	return (
		<>
			<Hero />
			<Content offers={data.offers} />
		</>
	);
};

export default Home;
