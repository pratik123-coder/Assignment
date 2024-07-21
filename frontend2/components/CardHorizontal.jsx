/* eslint-disable react/prop-types */


const CardHorizontal = ({ imageSrc, title, description, author, date }) => {
  return (
    <div className="card w-full  flex flex-row">
      <figure className="w-1/3">
        <img
          src={imageSrc}
          alt={title}
          className="w-full h-full object-cover rounded-2xl"
        />
      </figure>
      <div className="card-body w-2/3 flex flex-col justify-center">
        <p className="text-sm text-gray-500">{`by ${author} - ${date}`}</p>
        <h2 className="card-title text-xl font-semibold mt-2">{title}</h2>
        <p className="text-sm text-gray-700 mt-1">{description}</p>
        <div className="card-actions justify-end mt-2">
        <button className="btn btn-ghost btn-sm text-orange-400 font-bold">Read More...</button>
        </div>
      </div>
    </div>
  );
}

export default CardHorizontal;
