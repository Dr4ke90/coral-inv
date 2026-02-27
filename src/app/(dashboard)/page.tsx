import ItemCard from "@/components/ui/ItemCard";
import { IMAGE_MAPPING } from "@/features/dashboard/constants/image_mapping";
import { MODULES } from "@/features/dashboard/constants/modules";
import { PNG_LIST } from "@/features/dashboard/constants/png_list";
import { Box, Container, Divider} from "@mui/material";
import { StaticImageData } from "next/image";
import Link from "next/link";

import sheet from "../../../public/assets/png/sheet.png";

const Dashboard: React.FC = () => {
  const getImage = (name: string): StaticImageData =>
    PNG_LIST[IMAGE_MAPPING[name]] || sheet;

  return (
    <Container
      className="dashboard flex justify-center items-center h-[90vh]"
      maxWidth={false}
      sx={{ py: 4 }}
    >
      <Box className="flex flex-col gap-4">
        {MODULES.map((section) => (
          <Box key={section.id} component="section">
            <Box className="flex justify-center gap-3 flex-wrap">
              {section.list.map((item) => {
                const path =
                  section.departament === "general"
                    ? `/${item.toLowerCase()}`
                    : `/${section.departament}-${item.toLowerCase()}`;

                return (
                  <Link
                    href={path}
                    key={item}
                    style={{ textDecoration: "none", backgroundColor: "red" }}
                  >
                    <ItemCard
                      name={item.replaceAll("-", " ")}
                      image={
                        section.departament === "general"
                          ? sheet
                          : getImage(item)
                      }
                    />
                  </Link>
                );
              })}
            </Box>
            <Divider sx={{ width: "90%", mt: 2, mx: "auto" }} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default Dashboard;
