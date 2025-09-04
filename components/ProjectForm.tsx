"use client";
import React, { useActionState, useState } from 'react'
import { Input } from './ui/input'
import { Textarea } from './ui/textarea'
import MDEditor from '@uiw/react-md-editor'
import { Button } from './ui/button';
import { formSchema } from '@/lib/vaildation';
import { createProject } from '@/lib/action';
import { useRouter } from 'next/navigation';
import {z} from "zod";
import { useToast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';


const ProjectForm = () => {

    const{toast}=useToast();
    const [errors,setErrors]=useState<Record<string,string>>({});
    const [details,setDetails] = useState("");
    const router = useRouter();

    const handleFormSubmit=async(prevState:any,formData:FormData)=>{
        try{
            const formValues={
                title:formData.get("title") as string,
                description:formData.get("description") as string,
                category:formData.get("category") as string,
                link:formData.get("link") as string,
                details
            };
            await formSchema.parseAsync(formValues);
            const result = await createProject(prevState,formData,details);   
            if(result.status == 'Success'){
                toast({
                    title:"Success",
                    description:"Success"
                })
                router.push(`/project/${result._id}`)
            }

            return result;

        }catch(error){


            if(error instanceof z.ZodError){
                const fieldErrors= error.flatten().fieldErrors;
                setErrors(fieldErrors as unknown as Record<string,string>);

                return {...prevState,error:"Validation Error",status:"Error"}
                
            } 
              toast({
                    title:"Error",
                    description:"Error!! Please Fill the Fields Carefully!!"
                })

            return {...prevState,error:"An Unknown Error Occured",status:"Error"}
        }
      
    }
    const [state,formAction,isPending]= useActionState(handleFormSubmit,{error:
        "",status:"INITIAL"
    })

  return (
    <form action={formAction} className='project-form'>
        
        
        <div>
            <label htmlFor="title" className='project-form_label'>
                Title
            </label>
            <Input
            id='title'
            name='title'
            className='project-form_input'
            required
            placeholder='Project Title'/>
        </div>

        {errors.title && <p className='project-form_error'>
            {errors.title}</p>}


        <div>
            <label htmlFor="description" className="project-form_label">
                Description
            </label>
            <Textarea
            id='description'
            name='description'
            className='project-form_textarea'
            required
            placeholder='Project Description'/>
              {errors.description && <p className='project-form_error'>
            {errors.description}</p>}
        </div>

        <div>
            <label htmlFor="category" className="project-form_label">
                Category
            </label>
            <Input
            id='category'
            name='category'
            className='project-form_input'
            required
            placeholder='Project Category (Electronics,IT,NextJs,Python...)'
            />
              {errors.category && <p className='project-form_error'>
            {errors.category}</p>}
        </div>
        <div>


            <label htmlFor="link" className="project-form_label">
                Image Url
            </label>
            <Input
            id='link'
            name='link'
            className='project-form_input'
            required
            placeholder='Project Thumbnail Url'
            />
              {errors.link && <p className='project-form_error'>
            {errors.link}</p>}
        </div>

        <div data-color-mode="light">
            <label htmlFor="details" className='project-form_label'>
                Details 
            </label>
            
            <MDEditor
            value={details}
            onChange={(value)=>setDetails(value as string)}
            id='details'
            preview='edit'
            height={300}
            style={{borderRadius:20,overflow:"hidden"}}
            textareaProps={{
                placeholder:"Describe about your Project in Detail"
            }}
            previewOptions={{
                disallowedElements : ["style"]
            }}
            />
              {errors.details && <p className='project-form_error'>
            {errors.details}</p>}

        </div>

        <Button type='submit' className='project-form_btn text-white'
        disabled={isPending}>
            {isPending?"Submitting....":"Submit Your Project"}
            <Send className='size-6 ml-2>'/>
        </Button>
    </form>
  )
}

export default ProjectForm