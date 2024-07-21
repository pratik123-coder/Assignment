
import BlogsComponent from "../../components/BlogsComponent";
import Hero from "../../components/Hero";

const Home = () => {
	return (
		<div className="lg:pt-48">
			<Hero />
			
			<div className="p-20">
			<h1 className="text-5xl ps-20 pt-10 text-black font-semibold mb-10">Recent Posts</h1>
			<BlogsComponent />
			</div>
		</div>
	);
}

export default Home;