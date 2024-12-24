import React from "react";
import { Record } from "../../types/Record";

interface ProductCarouselProps {
  records: Record[];
}
type RecordKeysDictionary = {
  [K in keyof Record]: string;
};

const keysDictionary: RecordKeysDictionary = {
  description: "Descripción",
  type: "Tipo",
  category: "Categoría",
  tags: "Etiquetas",
  aspect1: "Aspecto 1",
  optionsAspect1: "Opciones Aspecto 1",
  aspect2: "Aspecto 2",
  optionsAspect2: "Opciones Aspecto 2",
  aspect3: "Aspecto 3",
  optionsAspect3: "Opciones Aspecto 3",
  sku: "SKU",
  weight: "Peso",
  price: "Precio",
  requiresShipping: "Requiere envío",
  imageUrl: "Imagen",
  seller: "Vendedor",
  title: "Título",
  variantAspect1: "Variante Aspecto 1",
  variantAspect2: "Variante Aspecto 2",
  variantAspect3: "Variante Aspecto 3",
  variantOptions1: "Opciones Variante 1",
  variantOptions2: "Opciones Variante 2",
  variantOptions3: "Opciones Variante 3",
};

const forbiddenKeys: (keyof Record)[] = [
  "tags",
  "aspect1",
  "optionsAspect1",
  "aspect2",
  "optionsAspect2",
  "aspect3",
  "optionsAspect3",
  "imageUrl",
  "variantAspect1",
  "variantAspect2",
  "variantAspect3",
  "variantOptions1",
  "variantOptions2",
  "variantOptions3",
];

const ProductCarousel: React.FC<ProductCarouselProps> = ({ records }) => {

  const getKeyToDisplay = (key: keyof Record) => {
    return keysDictionary[key] || key;
  }

  return (
    <div className="flex overflow-x-scroll space-x-4 py-4 ">
      {records.map((record, index) => (
        <div
          key={index}
          className="min-w-[200px] min-h-24 bg-white shadow-md rounded-lg overflow-hidden flex flex-col"
        >
          {/* Prioridad para la imagen */}
          {record.imageUrl && (
            <img
              src={record.imageUrl}
              alt={`Imagen ${index}`}
              className="h-32 w-full object-cover"
            />
          )}

          <div className="p-2 flex-1 flex flex-col space-y-1">
            {/* Renderizado de las demás propiedades */}
            {Object.entries(record).map(([key, value]) => {
              // Omitimos las propiedades que no queremos renderizar
              if (forbiddenKeys.includes(key as keyof Record)) return null;
              return (
                <p key={key} className="text-xs text-gray-600 truncate">
                  <span className="font-bold capitalize">{getKeyToDisplay(key as keyof Record)}:</span>{" "}
                  {typeof value === "boolean"
                    ? value
                      ? "Sí"
                      : "No"
                    : String(value)}
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
