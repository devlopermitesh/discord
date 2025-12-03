// import { NextRequest, NextResponse } from "next/server";
// import { imagekit } from "@/lib/imagekit";
// import { auth, currentUser } from '@clerk/nextjs/server'

// export async  function DELETE(req:NextRequest){
// try {
//     const {fileId}=await req.json();
//     if(!fileId){
//         return NextResponse.json({success:false,error:"fileId is neccessary"},{status:400})
//     }
//    const currentUser=await (req);
//    if (!currentUser || typeof currentUser !== "object" || !("id" in currentUser)) {
//     return NextResponse.json({ success: false, error: "Unauthorized request! Please try again later." }, { status: 401 });
// }

//     const response = await imagekit.deleteFile(fileId);
//     return NextResponse.json({success:true,message:"File Deleted SuccessFully"},{status:200})

// } catch (error) {
//     console.log("File Not Deleted: ",error)
//     return NextResponse.json({success:false,error:"Something went wrong!"},{status:500})
// }
// }
