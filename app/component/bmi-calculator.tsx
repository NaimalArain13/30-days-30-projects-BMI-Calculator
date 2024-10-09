"use client";
import {useState , ChangeEvent} from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardDescription, CardContent, CardHeader , CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

interface BmiResult {
    bmi: string;
    category: string;
  }
export default function BMICalculator(){
    const [height,setHeight] = useState<string>("");
    const [weight,setWeight] = useState<string>("");
    const [result, setResult] = useState<null|BmiResult>(null);
    const [error,setError] = useState<string>("");

    const handleHeightChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        setHeight(e.target.value)
        
    }
    const handleWeightChange = (e:ChangeEvent<HTMLInputElement>):void=>{
        setWeight(e.target.value)
        
    }

    const calculateBmi = ():void=>{
        if(!height || !weight){
        setError("Please enter both height and weight.")
        return
    }
    const heightInMeter = parseFloat(height) / 100;
    if(heightInMeter<=0){
        setError("Height must be a positive number");
        return;
    }
    const weightInKgs = parseFloat(weight);
    if(weightInKgs <=0){
        setError("Weight must be a positive number");
        return;
    }
    const bmi = weightInKgs/(heightInMeter * heightInMeter);
    let category = "";
    if(bmi < 18.5){
        category += "Underweight"
    }else if(bmi > 18.5 && bmi < 25){
        category += "Normal"
    }else if(bmi > 25 && bmi < 30){
        category += "Overweight"
    }else{
        category += "Obese"
    }
    setResult({ bmi: bmi.toFixed(1), category })
    setError("");
    setHeight("")
    setWeight("")
    }
    return(
       <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>BMI Calculator</CardTitle>
                <CardDescription>Enter your height and weight to calculate your BMI.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="grid gap-2">
                    <Label htmlFor="height">Height (cm)</Label>
                    <Input 
                    id = "height"
                    type="number"
                    placeholder="Enter your height"
                    value={height}
                    onChange={handleHeightChange}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="weight">Weight (kg)</Label>
                    <Input 
                    id = "weight"
                    type="number"
                    placeholder="Enter your weight"
                    value={weight}
                    onChange={handleWeightChange}
                    />
                </div>
                <Button onClick={calculateBmi}>Calculate</Button>
                {error && <div className="text-red-500 text-center">{error}</div>}
                {result && <div className="grid gap-2">
                    <div className="text-center text-2xl font-bold">{result.bmi}</div>
                    <div className="text-center text-muted-foreground">{result.category}</div>
                    </div>}
            </CardContent>
        </Card>
       </div>
    )
}