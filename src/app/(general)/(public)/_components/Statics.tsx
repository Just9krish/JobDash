import { Separator } from "@/components/ui/separator";

const stats = [
  {
    label: "companies hiring",
    value: "30k+",
  },
  {
    label: "new opening everyday",
    value: "2k+",
  },
  {
    label: "active job seeker",
    value: "3Mn+",
  },
];

export default function Statics() {
  return (
    <>
      <Separator></Separator>
      <section className="py-16">
        <div className="grid w-full grid-cols-3 gap-x-12">
          {stats.map(({ label, value }, index) => (
            <div
              key={value}
              className={`${index !== stats.length - 1 ? "border-r" : ""} flex flex-col items-center justify-center gap-1`}
            >
              <h4 className="text-5xl font-bold">{value}</h4>
              <p className="text-muted-foreground">{label}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
