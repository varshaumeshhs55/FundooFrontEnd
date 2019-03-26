import { CollaboratorComponent } from 'src/app/component/collaborator/collaborator.component';
import { Label } from './label';

export interface Note {

    title:string;
    discription:string;
    archive:boolean;
    inTrash:boolean;
    pinned:boolean;
    userId:string;
    noteId: string;
    color:string;
    labels:Label[];
    collaborators:CollaboratorComponent[];
    remainder:string;


}