import profilePic from '../assets/images/pablo_arango_gomez.jpg';

const Card = () => {

    return (
        <div className="card">
            <img className='card-image' src={profilePic} alt="Photograph of Pablo Arango-Gomez" />
            <h2 className='card-title'>Pablo Arango-Gomez</h2>
            <p className='card-text'>Software Engineer</p>
        </div>
    )

};

export default Card;