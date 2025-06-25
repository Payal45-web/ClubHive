// lib/api/activity.ts

// Import necessary modules and libraries
import type { Request, Response } from "express"
import type { ActivityService } from "../services/activityService"

// Define the ActivityController class
class ActivityController {
  private activityService: ActivityService

  constructor(activityService: ActivityService) {
    this.activityService = activityService
  }

  // Method to get all activities
  public getAllActivities = async (req: Request, res: Response) => {
    try {
      const activities = await this.activityService.getAllActivities()
      res.status(200).json(activities)
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" })
    }
  }

  // Method to create a new activity
  public createActivity = async (req: Request, res: Response) => {
    try {
      const newActivity = await this.activityService.createActivity(req.body)
      res.status(201).json(newActivity)
    } catch (error) {
      res.status(500).json({ error: "Failed to create activity" })
    }
  }

  // Method to update an existing activity
  public updateActivity = async (req: Request, res: Response) => {
    try {
      const updatedActivity = await this.activityService.updateActivity(req.params.id, req.body)
      res.status(200).json(updatedActivity)
    } catch (error) {
      res.status(500).json({ error: "Failed to update activity" })
    }
  }

  // Method to delete an activity
  public deleteActivity = async (req: Request, res: Response) => {
    try {
      await this.activityService.deleteActivity(req.params.id)
      res.status(204).send()
    } catch (error) {
      res.status(500).json({ error: "Failed to delete activity" })
    }
  }
}

// Export the ActivityController class
export default ActivityController
