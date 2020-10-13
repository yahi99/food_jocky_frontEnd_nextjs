import Banner from "../src/components/home/Banner";
import PopulerSlider from "../src/components/home/PopulerSlider";
import About from "../src/components/home/About";
import FindCity from "../src/components/home/FindCity";
import AppDownload from "../src/components/home/AppDownload";
import Faqs from "../src/components/home/Faqs";
import Layout from "../src/components/layouts/main";
import Loader from "../src/components/Common/Loader";

export default function Home() {
    return (
        <Layout>
            <Loader/>
            <Banner />
            <PopulerSlider />
            <About />
            <FindCity/>
            <AppDownload />
            <Faqs />
        </Layout>
  );
}
