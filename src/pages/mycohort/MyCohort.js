import SquareBracketsIcon from "../../assets/icons/squareBracketsIcon"
import Card from "../../components/card"
import ProfileCircle from "../../components/profileCircle"


export default function MyCohort () {
    
    return (
        <>
            <main>
                <Card>

                    <h4>My Cohort</h4>

                    <div className="soft-ware-dev">
                    <ProfileCircle  initials={<SquareBracketsIcon color="white" scale="scale(1.4)" />} />
                    <div>
                    <span>Software Development, Cohort 10</span>
                    <p>Januart 2023 - June 2023</p>
                    </div>
                    </div>

                    <div className="user-display-grid">

                    <section className="post-details user-display">
                        <ProfileCircle initials="K9"/>
                        <p>Joe Bloggs</p>
                        <div className="edit-icon">
                            <p>...</p>
                        </div>
                    </section>


                    <section className="post-details user-display">
                        <ProfileCircle initials="K9"/>
                        <p>Joe Bloggs</p>
                        <div className="edit-icon">
                            <p>...</p>
                        </div>
                    </section>

                    <section className="post-details user-display">
                        <ProfileCircle initials="K9"/>
                        <p>Joe Bloggs</p>
                        <div className="edit-icon">
                            <p>...</p>
                        </div>
                    </section>

                    <section className="post-details user-display">
                        <ProfileCircle initials="K9"/>
                        <p>Joe Bloggs</p>
                        <div className="edit-icon">
                            <p>...</p>
                        </div>
                    </section>

                    </div>
                </Card>
            </main>
            <aside>
                <Card>
                    <h4>Teachers</h4>
                    <section className="post-details user-display">
                        <ProfileCircle />
                        <span>Software Development, Cohort 10</span>
                        <div className="edit-icon">
                            <p>...</p>
                        </div>
                        
                    </section>
                </Card>
                <Card>
                    <h4>My Exercise</h4>
                </Card>
            </aside>
        </>
    )
}