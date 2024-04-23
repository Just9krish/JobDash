import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  CardFooter,
  Card,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function JobPreference() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Job Settings</CardTitle>
        <CardDescription>Customize your job preferences.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="days-before-start">Days Before Start</Label>
            <Input
              id="days-before-start"
              min="0"
              placeholder="Enter number of days"
              step="1"
              type="number"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="ideal-jobs">Ideal Jobs</Label>
            <Textarea
              id="ideal-jobs"
              placeholder="Enter job types separated by commas"
            />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              List the different types of jobs you are interested in.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="ideal-mthly">Ideal Monthly Salary</Label>
              <Input
                id="ideal-mthly"
                min="0"
                placeholder="Enter ideal monthly salary"
                step="100"
                type="number"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="min-mthly">Minimum Monthly Salary</Label>
              <Input
                id="min-mthly"
                min="0"
                placeholder="Enter minimum monthly salary"
                step="100"
                type="number"
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter>
        <Button>Save Changes</Button>
      </CardFooter>
    </Card>
  );
}
