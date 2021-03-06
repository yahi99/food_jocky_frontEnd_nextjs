import React, {useState} from 'react';
import Link from "next/link";
import ModalVideo from 'react-modal-video'
import '../../../node_modules/react-modal-video/css/modal-video.min.css'

const About = () => {
    const [isOpen, setOpen] = useState(false)
    const AboutData = {
        heading: "List your Restaurant on FoodJocky",
        para1: "By fulfilling deliveries as far as 25 miles from your location, Foodjocky enables your business to reach thousands of new customers to taste your amazing food? So would we!",
        para2: "Make up to 60% net profit on incremental delivery orders. With none of the overhead costs of a traditional dine-in experience, you can focus on cooking—we'll do the rest.",
        para3: "Interested? Let's start our partnership today!",
        button: "Get started"
    }

    return (
        <>
            <section id="about-area">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-7 offset-lg-5 col-md-8 offset-md-2 col-12">
                            <div className="about-area-right-text">
                                <p>{AboutData.para1}</p>
                                <p>{AboutData.para2}</p>
                                <p>{AboutData.para3}</p>
                                <ModalVideo channel='youtube' api={false} autoplay isOpen={isOpen} videoId="APVrmPcUbM4"
                                            onClose={() => setOpen(false)}/>
                                <div className="about-food-btn text-right">
                                    <a href="#!" className="watch_area" onClick={() => setOpen(true)}>Watch Video</a>
                                    <Link href={process.env.admin_url + '/register'}>
                                        <a className="btn button-site">{AboutData.button}</a>
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default About
