import "./styles.css";
import { Button, TextInput } from "flowbite-react";
import { useFormik } from "formik";
import { ResizableBox } from "react-resizable";

export default function App() {
  const form = useFormState();
  return (
    <div className="p-4 bg-slate-700 text-slate-100 h-screen">
      <h1 className=" text-3xl font-bold mb-10">Window Price calculator</h1>
      <main className="space-y-5">
        <div className="flex flex-col gap-2">
          <h5 className="mb-">Width</h5>
          <div className="flex gap-3">
            <Button.Group>
              <Button
                color={form.values.width === 100 ? "blue" : "gray"}
                onClick={() => form.setFieldValue("width", 100)}
              >
                100cm
              </Button>
              <Button
                color={form.values.width === 125 ? "blue" : "gray"}
                onClick={() => form.setFieldValue("width", 125)}
              >
                125cm
              </Button>
              <Button
                color={form.values.width === 150 ? "blue" : "gray"}
                onClick={() => form.setFieldValue("width", 150)}
              >
                150cm
              </Button>
            </Button.Group>
            <TextInput
              placeholder="Other"
              type="number"
              name="width"
              value={form.values.width}
              onChange={form.handleChange("width")}
            />
          </div>
        </div>

        {/**height */}
        <div className="flex flex-col gap-2">
          <h5 className="mb-">Height</h5>
          <div className="flex gap-3">
            <Button.Group>
              <Button
                color={form.values.height === 100 ? "blue" : "gray"}
                onClick={() => form.setFieldValue("height", 100)}
              >
                100cm
              </Button>
              <Button
                color={form.values.height === 125 ? "blue" : "gray"}
                onClick={() => form.setFieldValue("height", 125)}
              >
                125cm
              </Button>
              <Button
                color={form.values.height === 150 ? "blue" : "gray"}
                onClick={() => form.setFieldValue("height", 150)}
              >
                150cm
              </Button>
            </Button.Group>
            <TextInput
              placeholder="Other"
              type="number"
              name="height"
              value={form.values.height}
              onChange={form.handleChange("height")}
            />
          </div>
        </div>

        {/**glass thickness */}
        <div className="flex flex-col gap-2">
          <h5 className="mb-">Glass Thickness</h5>
          <div className="flex gap-3">
            <Button.Group>
              <Button
                color={form.values.thickness === 0.3 ? "blue" : "gray"}
                onClick={() => form.setFieldValue("thickness", 0.3)}
              >
                3mm
              </Button>
              <Button
                color={form.values.thickness === 0.5 ? "blue" : "gray"}
                onClick={() => form.setFieldValue("thickness", 0.5)}
              >
                5mm
              </Button>
              <Button
                color={form.values.thickness === 0.7 ? "blue" : "gray"}
                onClick={() => form.setFieldValue("thickness", 0.7)}
              >
                7mm
              </Button>
            </Button.Group>
            <TextInput
              placeholder="Other"
              type="number"
              name="thickness"
              value={form.values.thickness}
              onChange={form.handleChange("thickness")}
            />
          </div>
        </div>
        <div className="flex w-full items-center justify-center bg-sky-view p-8">
          {
            <ResizableBox
              width={CmToPX(form.values.width * SCALE)}
              height={CmToPX(form.values.height * SCALE)}
              resizeHandles={["s", "w", "e", "n"]}
              draggableOpts={{}}
              //minConstraints={[100, 100]}
              //maxConstraints={[300, 300]}
              className="flex border-8 border-gray-200 "
              onResize={(e) => {
                if (e.movementX !== 0) {
                  form.setFieldValue("width", form.values.width + e.movementX);
                } else if (e.movementY !== 0) {
                  form.setFieldValue(
                    "height",
                    form.values.height + e.movementY,
                  );
                }
              }}
            >
              <div className="w-1/2 h-full border-r-2 border-gray-200">
                <div className=" w-full h-full class   "></div>
              </div>
              <div className="w-1/2 h-full border-l-2 border-gray-200">
                <div className="w-full h-full class  "></div>
              </div>
            </ResizableBox>
          }
          {/*
            <div
              className="flex border-8 border-gray-200 resize"
              style={{
                width: `${form.values.width * SCALE}cm`,
                height: `${form.values.height * SCALE}cm`,
                resize: "both",
                overflow: "auto",
              }}
              onResize={(e) => {
                console.log("resizing");
              }}
            >
              <div className="w-1/2 h-full border-r-2 border-gray-200">
                <div className=" w-full h-full class   "></div>
              </div>
              <div className="w-1/2 h-full border-l-2 border-gray-200">
                <div className="w-full h-full class  "></div>
              </div>
            </div>
            */}
        </div>
        <div className=" flex ites-center gap-3 justify-center font-semibold text-lg">
          <h6>Price:</h6>
          <h6>{getPrice(form.values)} $</h6>
        </div>
      </main>
    </div>
  );
}

function useFormState() {
  return useFormik({
    initialValues: {
      width: 100,
      height: 100,
      thickness: 0.5,
    },
    onSubmit: () => {},
  });
}
// unit is cm
//each 100cm in reality is represented by 5cm here
const SCALE = 0.05;
const COST_SQUAR_CENTIMETER = 0.001; //$
const PPI = 96;
function getPrice(data: any) {
  const price = data.width * data.height * COST_SQUAR_CENTIMETER;
  return Math.round(price * 100) / 100;
}

function CmToPX(n: number) {
  return (PPI * n) / 2.54;
}
