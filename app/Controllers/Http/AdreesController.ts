import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Adress from 'App/Models/Adress'

export default class AdreesController 
{
    public async store({request,response,auth}:HttpContextContract)
    {

            // Asegurarse de que el usuario esté autenticado
            await auth.use('api').authenticate()
      
            // Obtener el ID del usuario autenticado
            const userid = auth.user!.id
            const {street,suburb,city,state,country,zip_code,latitude,longitude} = request.all()
            const adress = await Adress.create({street,suburb,city,state,country,zip_code,latitude,longitude,user_id:userid})

      
            return response.ok({ adress })

    }
    public async index({ response }: HttpContextContract) {
        // relación de usuario en la consulta (preload(tabla relacionada))
        const adresses = await Adress.query().preload('users')
        return response.ok(adresses)
      }

      
      public async indexp({ response,auth }: HttpContextContract) {
        try{
          //autentica el usuario usando el guard de api
        await auth.use('api').authenticate()
       const userid= auth.user!.id
       //primero usar query despues dar instrucciones para realizar la consulta, el where se selecciona primero la columna y despues el valor que se va a filtrar
       const adresses = await Adress.query()
       .where('user_id', userid)
       .preload('users')
        return response.ok(adresses)
        }
        catch(error){
          return response.unauthorized('no tienes autorizacion')
        }
      }
}
