import React, { useState } from 'react'
import './HomePage.css'
import home_image from "../../assets/home_image.jpg"

const HomePage = () => {
    const jokes = ["Why are snails slow? Because they’re carrying a house on their back.",
        "What’s the smartest insect? A spelling bee!",
        "What does a storm cloud wear under his raincoat? Thunderwear.",
        "How does the ocean say hi? It waves!",
        "What do you call a couple of chimpanzees sharing an Amazon account? PRIME-mates.",
        "Name the kind of tree you can hold in your hand? A palm tree!",
        "What do birds give out on Halloween? Tweets.",
        "What did the policeman say to his hungry stomach? “Freeze. You’re under a vest.”",
        "What did the left eye say to the right eye? Between us, something smells!",
        "What did Yoda say when he saw himself in 4k? HDMI.",
        "Which superhero hits home runs? Batman!",
        "What’s Thanos’ favorite app on his phone? Snapchat.",
        "Sandy’s mum has four kids; North, West, East. What is the name of the fourth child? Sandy, obviously!"
    ]

    const [randomJoke] = useState(jokes[Math.floor(Math.random() * jokes.length)]);

    return (
        <main className="home-page">
            <h2 className="home-page-title animate__animated animate__backInDown">Home Page</h2>

            <img className="home-page-image animate__animated animate__zoomIn" src={home_image} alt="home_image" />

            <section className="home-page-description animate__animated animate__fadeIn">
                <h4>This is a random joke:</h4>

                <p>{randomJoke}</p>
                <br />
                <p>(Burayı ve yukarıdaki iğrenç görsel ve şakaları (yani tüm sayfayı aq) öylesine koydum yer dolsun diye. Değişecek. Siteye refresh atınca not found hatası gösterecektir.
                    O benden kaynaklı bir şey değil. Bana bedava domain ve hosting sağlayan render.com kaynaklı. Bedava mal işte yapacak bir şey yok. Bug falan görürseniz bana bildirin. )<br />
                </p>
                <br />
                <b>Alpha v1.3.7 notes: </b><br />
                <small>Makale silme ve editleme eklendi.</small>
            </section>
        </main>
    )
}

export default HomePage