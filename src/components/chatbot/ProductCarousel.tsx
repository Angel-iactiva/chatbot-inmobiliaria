import React from "react";
import { Product } from "./ChatWindow";

interface ProductCarouselProps {
  records: Product[];
}

const ProductCarousel: React.FC<ProductCarouselProps> = ({ records }) => {
  return (
    <div className="flex overflow-x-scroll space-x-4 p-4 ">
      {records.map((record, index) => (
        <div
          key={index}
          className="min-w-[200px] min-h-24 bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
        >
          {/* Prioridad para la imagen */}
          {record["imagen"] && (
            <img
              src={record["imagen"] as string}
              alt={`Imagen ${index}`}
              className="h-32 w-full object-cover"
            />
          )}

          <div className="p-2 flex-1 flex flex-col space-y-1">
            {/* Renderizado de las demás propiedades */}
            {Object.entries(record).map(([key, value]) => {
              // Omitimos la propiedad "imagen" porque ya la renderizamos arriba
              if (key === "imagen") return null;

              return (
                <p key={key} className="text-xs text-gray-600 truncate">
                  <span className="font-bold capitalize">{key}:</span>{" "}
                  {typeof value === "boolean"
                    ? value
                      ? "Sí"
                      : "No"
                    : value}
                </p>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCarousel;
