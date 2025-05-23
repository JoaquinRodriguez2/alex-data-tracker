
export function getPagesLogic(totalItems: number, 
    currentPage:number,
    pageSize:number){
        const totalPages = Math.ceil(totalItems / pageSize);
        //The page size is a range of (0,1), (2,3), (4,5), so
        //it should return it
        const bottomRange = (currentPage - 1) * pageSize;
        const topRange = bottomRange + pageSize - 1;
        return{
            top: topRange,
            bottom:bottomRange,
            totalPages:totalPages
        }
    }