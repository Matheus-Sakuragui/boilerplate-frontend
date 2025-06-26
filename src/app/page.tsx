import { Button } from "@/components/atoms/button"

export default function Home() {
    return (
        <div className="bg-resix-blue-50">
            <div className="text-amber-400 underline">
                HelloWorld
                <Button variant="disabled">Click Here</Button>
            </div>
        </div>
    )
}
