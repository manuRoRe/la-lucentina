import { CONTACT_INFO } from "@/config/Constants";
import {
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialog,
  AlertDialogContent,
  AlertDialogTrigger,
} from "./ui/alert-dialog";

const ContactAlert = ({ children }: { children: React.ReactNode }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>

      <AlertDialogContent className="rounded-2xl w-[90%] max-w-[400px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-black uppercase tracking-tight">
            ¿Hacemos tu pedido?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base">
            Te conectaremos directamente con La Lucentina para que puedas pedir
            tus platos favoritos o consultar lo que quieras.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2 mt-4">
          <AlertDialogCancel className="font-bold uppercase text-xs tracking-widest border-2">
            Aun no
          </AlertDialogCancel>
          <AlertDialogAction asChild className="bg-black hover:bg-neutral-800">
            <a
              href={`tel:${CONTACT_INFO.phone}`}
              className="font-bold uppercase text-xs tracking-widest text-white"
            >
              Llamar ahora
            </a>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ContactAlert;
