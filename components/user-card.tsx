import { Card, CardContent } from "@/components/ui/card"
import Image, { StaticImageData } from "next/image"

interface UserCardProps {
  name: string
  job: string
  email: string
  userPicture: StaticImageData 
  className?: string
}

export function UserCard({ name, job, email, userPicture, className }: UserCardProps) {
  return (
    <Card className={className}>
      <CardContent className="flex flex-col items-center p-6">
        <div className="w-20 h-20 mb-4 overflow-hidden rounded-full border-2 border-primary">
          <Image src={userPicture} alt={name} width={80} height={80} className="object-cover rounded-full" />
        </div>

        <h3 className="font-semibold text-lg mb-1">{name}</h3>
        <p className="text-sm text-muted-foreground mb-2 text-center">{job}</p>
        
        <a href={`mailto:${email}`} className="text-sm text-primary hover:underline">
          {email}
        </a>
      </CardContent>
    </Card>
  )
}
