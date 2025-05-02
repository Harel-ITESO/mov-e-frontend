export type Movie = {
    title: string;
    poster: string;
    year: number;
  };
  
  export default function MovieCard({ movie }: { movie: Movie }) {
    return (
      <div className="card w-60 bg-base-100 shadow-xl">
        <figure>
          <img src={movie.poster} alt={movie.title} className="h-80 object-cover" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{movie.title}</h2>
          <p>{movie.year}</p>
          <div className="card-actions justify-end">
            <button className="btn btn-primary btn-sm">Ver más</button>
          </div>
        </div>
      </div>
    );
  }