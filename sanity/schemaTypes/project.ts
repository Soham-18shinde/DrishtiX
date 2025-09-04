import { UserIcon } from "lucide-react";
import { defineType,defineField } from "sanity";

export const project = defineType({
      name:"project",
    title:"Project",
    type:"document",
    icon:UserIcon,
    fields:[
        defineField({
            name:"slug",
            type:"slug",
            options:{
                source:"title"
            }
        }),
        defineField({
            name:"title",
            type:"string"
        }),
        defineField({
            name:"author",
            type:"reference",
            to:{type:'author'}
        }),
        defineField({
            name:"views",
            type:"number"
        }),
        defineField({
            name:"description",
            type:"text"
        }),
        defineField({
            name:"category",
            type:"string",
            validation:(Rule)=>Rule.min(1).max(50).required().error("Please Enter a Valid Category"),
        }),
          defineField({
            name:"image",
            type:"url",
            validation:(Rule)=>Rule.required()
        }),
          defineField({
            name:"details",
            type:"markdown",
        }),
    ],
    preview:{
        select:{
            "title":"title"
        }
    }
})