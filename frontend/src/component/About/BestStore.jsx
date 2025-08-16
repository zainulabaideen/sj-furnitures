import React from "react";
import p1_img from "../../assets/bestStore_1.webp";
import p2_img from "../../assets/bestStore_2.webp";
import p3_img from "../../assets/bestStore_3.webp";

const BestStore = () => {
    let data_store = [
        {
            id: 1,
            title: "Perfect Design Furniture",
            discription:
                "Design first took up their tools in 2000 & since then have grown into a reliable and innovative artisan.",
            image: p1_img,
        },
        {
            id: 2,
            title: "Exquisite Products",
            discription:
                "Explore their creative journey & design sensibility in their revamped Carpen Portfolio.",
            image: p2_img,
        },
        {
            id: 3,
            title: "Fast and Safe Shipping",
            discription:
                "All of our cabinets, desk units, furniture, and many other products at our Perfect warehouse location.",
            image: p3_img,
        },
    ];

    return (
        <section className="mt-10 md:mt-20 px-3 md:px-20 text-center space-y-10">
            <header>
                <h1 className="text-primary font-bold md:text-4xl text-2xl">
                    The <span className="text-secondary">Best Furniture</span> Store
                </h1>
            </header>

            <div className="flex justify-center w-full">
                <div className="grid grid-cols-1 md:grid-cols-2 justify-items-center lg:grid-cols-3 gap-10">
                    {data_store.map((item) => (
                        <article
                            data-aos="fade-up"
                            className="w-full max-w-md gap-5 md:mt-10"
                            key={item.id}
                        >
                            <figure className="overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="h-72 w-full transition transform ease-in-out duration-700 hover:scale-110"
                                />
                            </figure>

                            <div className="my-5 space-y-2">
                                <header className="flex items-center justify-between">
                                    <h2 className="font-bold text-primary md:text-2xl text-xl">
                                        {item.title}
                                    </h2>
                                </header>
                                <p className="text-start">{item.discription}</p>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default BestStore;
