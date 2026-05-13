import {prisma} from "../database/prisma.js"

export async function createSession(){
    return await prisma.chatSession.create({
        data:{
            title:""
        }
    })
}

export async function saveMessage(sessionId:string,role:string,content:string){
    return await prisma.chatMessage.create({
        data:{
            sessionId,
            role,
            content,
        }
    })
}

export async function getSessionMessages(){
    return await prisma.chatSession.findMany({
        orderBy:{
            createdAt:"asc"
        },
        select:{
            id:true, title:true, updatedAt: true
        }
    })
}

export async function getSessionById(sessionId:string){
    return await prisma.chatSession.findUnique({
        where:{
            id:sessionId
        },
        include:{
            messages:{
                orderBy:{
                    createdAt:"asc"
                }
            }
        }
    })
}

export async function updateSessionTitle(sessionId:string, title:string){
    return await prisma.chatSession.update({
        where:{
            id:sessionId,
        },
        data:{
            title,
        }
    })
}

export async function deleteSession(
  sessionId: string
) {
  return await prisma.chatSession.delete({
    where: {
      id: sessionId,
    },
  });
}

