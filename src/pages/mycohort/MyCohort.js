import SquareBracketsIcon from "../../assets/icons/squareBracketsIcon"
import Card from "../../components/card"
import ProfileCircle from "../../components/profileCircle"
export default function MyCohort () {
    
    return (
        <>
            <main>
                <Card>
                    <h4>My Cohort</h4>
                    <ProfileCircle initials={<SquareBracketsIcon/>}/>
                    <section className="post-details border-top">
                        <ProfileCircle initials="K9"/>
                        <p>Joe Bloggs</p>
                        <div className="edit-icon">
                            <p>...</p>
                        </div>
                    </section>
                </Card>
            </main>
            <aside>
                <Card>
                    <h4>Teachers</h4>
                </Card>
                <Card>
                    <h4>My Exercise</h4>
                </Card>
            </aside>
        </>
    )
}