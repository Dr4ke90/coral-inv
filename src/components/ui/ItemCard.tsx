import React from "react";
import { Card, CardContent, Typography, CardMedia } from "@mui/material";
import { StaticImageData } from "next/image";

interface ItemCardProps {
  name: string;
  image?: string | StaticImageData;
  onClick?: () => void;
}

const ItemCard: React.FC<ItemCardProps> = ({ name, image, onClick }) => {
  const formattedName = name.slice(0, 1).toUpperCase() + name.slice(1);

  return (
    <Card
      onClick={onClick}
      className="
        w-[140px] min-w-[130px] h-[155px] cursor-pointer 
         hover:scale-[1.1] flex items-center justify-center 
      "
      elevation={0}
      tabIndex={0}
    >
      <CardContent className="flex flex-col items-center justify-center text-center bg-blue-500/20">
        {image ? (
          <CardMedia
            component="img"
            image={typeof image === "string" ? image : image.src}
            alt={formattedName}
            className="
              h-[100px] w-[70px] object-contain m-2 p-2
              transition-transform duration-200
              group-hover:scale-105 
            "
          />
        ) : (
          <Typography>Imagine indisponibilă</Typography>
        )}

        <Typography sx={{ fontWeight: "600" }} title={formattedName}>
          {formattedName}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ItemCard;
